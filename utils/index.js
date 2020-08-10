const fs = require('fs')
const PDFImage = require('pdf-image').PDFImage

const saveCoverFromPdfToPng = async (filePath) => {
    const pdfImage = new PDFImage(filePath)
    const info = await pdfImage.getInfo()

    const pdfFileBaseName = pdfImage.pdfFileBaseName
    //console.log('INFOOO: ', info)
    const pages = info.Pages
    let namePngFile = `${pdfFileBaseName}-0.png`
    await pdfImage
        .convertPage(0)
        .then(function (imagePath) {
            // 0-th page (first page) of the slide.pdf is available as slide-0.png
            //ok = fs.existsSync(path); // => true
        })
        .catch((err) => {
            console.log('err: ', err)
        })
    return { namePngFile, pages }
}

const deleteFile = (pathFile) => {
    fs.unlinkSync(`./${pathFile}`)
}

module.exports = {
    saveCoverFromPdfToPng,
    deleteFile,
}
