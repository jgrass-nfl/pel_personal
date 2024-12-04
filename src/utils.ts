
type defLabelFn = (dyObj: any) => string;

export class Uib {
  static buildDiv(className: string, ...internalNodes: (string | HTMLElement)[]) {
    let newDiv = document.createElement("div") as HTMLDivElement;
    if (className != "") {
      newDiv.classList.add(className);
    }
    newDiv.append(...internalNodes);
    return newDiv;
  }
  static buildSpan(className: string, ...internalNodes: (string | HTMLElement)[]) {
    let newSpan = document.createElement("span") as HTMLSpanElement;
    if (className != "") {
      newSpan.classList.add(className);
    }
    newSpan.append(...internalNodes);
    return newSpan;
  }
  static buildImg(path: string, width: number, height: number) {
    let newImg = document.createElement("img") as HTMLImageElement;
    newImg.src = path;
    newImg.width = width;
    newImg.height = height;
    return newImg;
  }
  static buildImgFixAspect(path: string, maxWidth: number, maxHeight: number) {
    let newImg = document.createElement("img") as HTMLImageElement;
    newImg.src = path;
    newImg.style.maxWidth = maxWidth + "px";
    newImg.style.maxHeight = maxHeight + "px";
    return newImg;
  }
  static buildButton(className: string, onClickObj: any, onClickFn: string, ...internalNodes: (string | HTMLElement)[]) {
    let newButton = document.createElement("button") as HTMLButtonElement;
    newButton.classList.add(className);
    if (onClickObj != null) {
      newButton.onclick = buildCallback(onClickObj, onClickFn);
    }
    newButton.append(...internalNodes);
    return newButton;
  }
  static buildIndexButton(className: string, onClickObj: any, onClickFn: string, index: number, ...internalNodes: (string | HTMLElement)[]) {
    let newButton = document.createElement("button") as HTMLButtonElement;
    newButton.classList.add(className);
    if (onClickObj != null) {
      newButton.onclick = buildCallback(onClickObj, onClickFn, index);
    }
    newButton.append(...internalNodes);
    return newButton;
  }
  static buildButtonCB(className: string, cb: any, ...internalNodes: (string | HTMLElement)[]) {
    let newButton = document.createElement("button") as HTMLButtonElement;
    newButton.classList.add(className);
    newButton.onclick = cb;
    newButton.append(...internalNodes);
    return newButton;
  }
  static buildRadio(className: string, onClickObj: any, onClickFn: string, index: number) {
    let newButton = document.createElement("input") as HTMLInputElement;
    newButton.classList.add(className);
    newButton.type = "radio";
    if (onClickObj != null) {
      newButton.onclick = buildCallback(onClickObj, onClickFn, index);
    }
    return newButton;
  }
  static buildInput(className: string, type: string, size: number) {
    let newInput = document.createElement("input") as HTMLInputElement;
    newInput.classList.add(className);
    newInput.type = type;
    if (size > 0) {
      newInput.size = size;
    }
    return newInput;
  }
  static buildImageSelector(className: string) {
    let newInput = document.createElement("input") as HTMLInputElement;
    newInput.classList.add(className);
    newInput.type = "file";
    newInput.accept = "image/x-png,image/gif,image/jpeg";
    newInput.multiple = true;
    return newInput;
  }
  static buildTextArea(className: string, rows: number) {
    let newTextArea = document.createElement("textarea") as HTMLTextAreaElement;
    newTextArea.classList.add(className);
    newTextArea.rows = rows;
    newTextArea.maxLength = 512;
    return newTextArea;
  }
  static buildLabel(className: string, ...internalNodes: (string | HTMLElement)[]) {
    let newLabel = document.createElement("label") as HTMLLabelElement;
    newLabel.classList.add(className);
    newLabel.append(...internalNodes);
    return newLabel;
  }
  static buildHtml(className: string, htmlContent: string) {
    let newDiv = document.createElement("div") as HTMLDivElement;
    newDiv.classList.add(className);
    newDiv.innerHTML = htmlContent;
    return newDiv;
  }
  static buildCanvas(className: string, width: number, height: number) {
    let newCanvas = document.createElement("canvas") as HTMLCanvasElement;
    newCanvas.classList.add(className);
    newCanvas.width = width;
    newCanvas.height = height;
    return newCanvas;
  }
  static buildFileButton(className: string,
      buttonImg: string, width: number, height: number,
      onClickObj: any, onClickFn: string) {
    // Forces the opacity to 0
    let filePickerButton =
        Uib.buildImageSelector("file_input_blank");

    let fileInput =
      Uib.buildDiv(className,
        Uib.buildLabel("file_input_label",
          Uib.buildImg(buttonImg, width, height),
          filePickerButton));

    fileInput.style.width = width.toString() + "px";
    fileInput.style.height = height.toString() + "px";

    filePickerButton.onchange = buildCallback(onClickObj, onClickFn, filePickerButton);
    
    return fileInput;
  }
  static buildDeferredDivLabel(className: string, defObj: any, defEvalFn: defLabelFn) {
    let newDiv = document.createElement("div") as HTMLDivElement;
    if (className != "") {
      newDiv.classList.add(className);
    }
    let result = defEvalFn(defObj);
    newDiv.append(result);
    defObj.addDeferred(() => {
      newDiv.innerHTML = "";
      let result = defEvalFn(defObj);
      newDiv.append(result);
    });
    return newDiv;
  }
  static buildDeferredSpanLabel(className: string, defObj: any, defEvalFn: defLabelFn) {
    let newSpan = document.createElement("span") as HTMLSpanElement;
    if (className != "") {
      newSpan.classList.add(className);
    }
    let result = defEvalFn(defObj);
    newSpan.append(result);
    defObj.addDeferred(() => {
      newSpan.innerHTML = "";
      let result = defEvalFn(defObj);
      newSpan.append(result);
    });
    return newSpan;
  }
  static setPadding(el: HTMLElement, pad: number) {
    el.style.paddingTop = "" + (pad) + "px";
    el.style.paddingLeft = "" + (pad) + "px";
    el.style.paddingBottom = "" + (pad) + "px";
    el.style.paddingRight = "" + (pad) + "px";
  }
}

type callName = string | null;

class Callback {
  obj: any;
  fname: string;
  cache: any;
  fn: any; 

  constructor(obj: any, fname: string, cache?: any) {
    this.obj = obj;
    this.fname = fname; // TODO assert if obj doesn't have the function name
    this.cache = cache;
    let self = this;
    this.fn = function() { self.call(); }
  }
  call(...params: any[]) : any {
    if (typeof(this.cache) !== 'undefined') {
      let newParams = [this.cache];
      newParams.push(...params);
      return this.obj[this.fname].apply(this.obj, newParams);
    } else {
      return this.obj[this.fname].apply(this.obj, params);
    }
  }
  static callFn(obj: any, fn: callName, ...params: any[]) : any {
    if (fn != null) {
      return obj[fn].apply(obj, params);
    }
    return null;
  }
}

export function buildCallback(obj: any, fname: string, cache?: any) {
  let callBack = new Callback(obj, fname, cache);
  return callBack.fn;
}
