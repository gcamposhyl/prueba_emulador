let upload = document.getElementById('upload-pdf');
let canvas = document.getElementById('my-pdf');
let prevPage = document.getElementById('prevPage');
let nextPage = document.getElementById('nextPage'); 
let currPage = document.getElementById('currPage');
let maxPage = document.getElementById('maxPage');
let zoomOut = document.getElementById('zoomOut');
let zoomIn = document.getElementById('zoomIn');
let zoom = document.getElementById('zoom');

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1;
let context = canvas.getContext('2d');

function renderPage(pageNum, scale) {
    currPage.textContent = pageNum;
    zoom.textContent = Math.floor(scale * 100) + '%';

    pageRendering = true;

    pdfDoc.getPage(pageNum)
    .then(function (page) {
        let viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        let renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending, scale);
                pageNumPending = null;
            }
        });
    });
}

function queueRenderPage(num, scale) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num, scale);
    }
}

function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum, scale);
}
prevPage.addEventListener('click', onPrevPage);

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum, scale);
}
nextPage.addEventListener('click', onNextPage);

function onZoomOut() {
    if (scale <= 0.5) {
        return;
    }
    scale -= 0.1;
    queueRenderPage(pageNum, scale);
}
zoomOut.addEventListener('click', onZoomOut);

function onZoomIn() {
    if (scale >= 3) {
        return;
    }
    scale += 0.1;
    queueRenderPage(pageNum, scale);
}
zoomIn.addEventListener('click', onZoomIn);

function drawPdf(dataUrl) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    let loadingTask = pdfjsLib.getDocument({ data: atob(dataUrl) });

    loadingTask.promise
    .then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        
        maxPage.textContent = pdfDoc.numPages;

        renderPage(pageNum, scale);
    });
}

//file upload
function arrayBufferToBase64(buffer) {
	let binary = '';
	let bytes = new Uint8Array(buffer);
	let len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

upload.onchange = (event) => {
    let input = event.target.files[0];
    if (!input) {
        return false;
    }
    let fr = new FileReader();
    fr.onload = () => {
        let base64 = arrayBufferToBase64(fr.result);
        pageNum = 1;
        scale = 1;
        drawPdf(base64);
    }
    fr.onerror = () => {
        console.error('File Reader error');
        fr.abort();
    }
    fr.readAsArrayBuffer(input);
}

export {
    renderPage,
    queueRenderPage,
    onPrevPage,
    onNextPage,
    onZoomIn,
    onZoomOut,

}