function generatePDF() {
    
    var downloading = document.getElementByClassName(".container");
     html2pdf()
    .from(element)
    .save();
}