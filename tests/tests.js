/**
 * Created by f004 on 30.05.2017.
 */
exports.defineAutoTests = function () {
    describe('PdfViewer (window.PdfViewer)', function () {
        it("should exist", function () {
            expect(window.PdfViewer).toBeDefined();
        });

        it("should contain a function openPdf (should succeed)", function () {
            expect(window.PdfViewer.openPdf).toBeDefined();
            expect(typeof window.PdfViewer.openPdf === "function").toBe(true);
        });
    });
};