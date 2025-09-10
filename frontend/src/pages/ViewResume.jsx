import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ViewResume() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/resume/${id}`)
      .then((res) => setResume(res.data))
      .catch(() => {});
  }, [id]);

  // A4 size in points (jsPDF uses pt). We convert to pixels at 96dpi for the clone width.
  const A4_PT_WIDTH = 595.28;
  const A4_PT_HEIGHT = 841.89;
  const DPI = 96; // browser pixels per inch (approx)
  const PT_TO_PX = DPI / 72; // 72 points = 1 inch
  const A4_PX_WIDTH = Math.round(A4_PT_WIDTH * PT_TO_PX); // ≈ 794px

  const nodeFilter = (node) => {
    if (!node || !node.nodeName) return false;
    const tag = node.nodeName.toLowerCase();
    if (tag === "iframe" || tag === "script" || tag === "noscript") return false;

    // Avoid nodes with modern unsupported color functions if possible
    try {
      const style = window.getComputedStyle(node);
      const bg = (style && (style.background || style.backgroundColor || "")).toLowerCase();
      if (bg.includes("oklch") || bg.includes("lab(") || bg.includes("lch(") || bg.includes("color(")) {
        return false;
      }
    } catch (e) {
      // ignore
    }
    return true;
  };

  const downloadPdf = async () => {
    if (!ref.current) return;

    try {
      // 1) Clone the node so we can force a clean width and remove any page layout side-effects
      const node = ref.current;
      const clone = node.cloneNode(true);

      // Apply styles to the clone so it appears exactly like the card but with fixed width
      clone.style.boxSizing = "border-box";
      clone.style.width = `${A4_PX_WIDTH}px`; // set clone width to A4 px width
      clone.style.maxWidth = `${A4_PX_WIDTH}px`;
      clone.style.margin = "0"; // reset margins so it is left-aligned in its own box
      clone.style.position = "static"; // ensure normal flow
      // force white background for the page
      clone.style.background = "#ffffff";

      // Put the clone off-screen (so it is rendered by the browser but not visible)
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.zIndex = "-1000";
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // 2) Render clone to PNG using html-to-image with pixelRatio for crisp result
      //    Use pixelRatio 2 for higher resolution (adjust if memory issues)
      const dataUrl = await toPng(clone, {
        filter: nodeFilter,
        cacheBust: true,
        pixelRatio: 2,
      });

      // clean up the clone wrapper immediately
      document.body.removeChild(wrapper);

      // 3) Create an Image from dataUrl
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e);
        image.src = dataUrl;
      });

      // 4) Prepare pdf and slicing logic
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // in pt
      const pdfHeight = pdf.internal.pageSize.getHeight(); // in pt

      // The image dimensions are pixels. We used pixelRatio 2, so image.width is in device px.
      // Compute scale to convert image px => pdf pt:
      // We rendered the clone at A4_PX_WIDTH px. We want it to fit pdfWidth (pt).
      // scalePxToPt = pdfWidth (pt) / image.width (px)
      const scalePxToPt = pdfWidth / img.width;
      const imgHeightPts = img.height * scalePxToPt;

      // If the image height (in pt) fits in one page, just add it
      if (imgHeightPts <= pdfHeight) {
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, imgHeightPts);
      } else {
        // Multi-page slice: slice original image by height in px that corresponds to pdfHeight
        const sliceHeightPx = Math.floor(pdfHeight / scalePxToPt);

        let yPx = 0;
        while (yPx < img.height) {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          const thisSlicePx = Math.min(sliceHeightPx, img.height - yPx);
          canvas.height = thisSlicePx;
          const ctx = canvas.getContext("2d");

          // white background
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // draw the slice of the big image onto the canvas
          ctx.drawImage(img, 0, yPx, img.width, thisSlicePx, 0, 0, img.width, thisSlicePx);

          const sliceData = canvas.toDataURL("image/png");
          const sliceHeightPts = thisSlicePx * scalePxToPt;

          pdf.addImage(sliceData, "PNG", 0, 0, pdfWidth, sliceHeightPts);

          yPx += thisSlicePx;
          if (yPx < img.height) pdf.addPage();
        }
      }

      // 5) Save
      pdf.save(`${resume?.title || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF download failed. Check console for details.");
    }
  };

  if (!resume) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading resume...
      </div>
    );
  }

  const d = resume.data || {};

  return (
    <div className="pt-24 px-6 md:px-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold text-gray-700">{resume.title}</h2>
        <div className="flex gap-3">
          <button
            onClick={downloadPdf}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Resume Preview (this is the element we clone) */}
      <div
        ref={ref}
        className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200"
      >
        {/* Name & Title */}
        <h1 className="text-4xl font-bold text-gray-800">{d.name || "Full Name"}</h1>
        <div className="text-lg text-blue-600 italic mt-1">{d.title || "Professional Title"}</div>

        {/* Summary */}
        <p className="mt-6 text-gray-700 leading-relaxed">
          {d.summary || "Your professional summary or objective will appear here."}
        </p>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 text-lg">Skills</h3>
          <p className="text-gray-600">{d.skills || "—"}</p>
        </div>

        {/* Contact */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 text-lg">Contact</h3>
          <p className="text-gray-600">{d.contact || "—"}</p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 text-lg">Education</h3>
          <div className="text-gray-600 text-sm space-y-1 mt-2">
            <p>
              <strong>10th:</strong> {d.education?.school10?.name || "—"} | Marks:{" "}
              {d.education?.school10?.marks || "—"} | Year: {d.education?.school10?.year || "—"}
            </p>
            <p>
              <strong>12th:</strong> {d.education?.school12?.name || "—"} | Marks:{" "}
              {d.education?.school12?.marks || "—"} | Year: {d.education?.school12?.year || "—"}
            </p>
            <p>
              <strong>College:</strong> {d.education?.college?.name || "—"} (
              {d.education?.college?.degree || "—"}) | Marks: {d.education?.college?.marks || "—"} | Year:{" "}
              {d.education?.college?.year || "—"}
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 text-lg">Projects</h3>
          <div className="space-y-3 mt-2">
            {(d.projects || []).length > 0 ? (
              d.projects.map((proj, i) => (
                <div key={i} className="border rounded p-3">
                  <h4 className="font-semibold text-gray-800">{proj.title || "Untitled Project"}</h4>
                  <p className="text-gray-600 text-sm">{proj.description || "No description provided."}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No projects added.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
