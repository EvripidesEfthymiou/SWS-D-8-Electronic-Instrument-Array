/* De Havilland Canada Dash 8 Electronic Instrument Array (EIA) v1.0. Created by Evripides E. Efthymiou for SimWorks Studios Ltd., 2026 */

//Gets the width and height of the element with the given ID
export function getElementSize(elementId: string): { width: number, height: number } {
    const element = document.getElementById(elementId);
    if (element) {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }
    else {
        throw new Error(`Element with ID '${elementId}' not found`);
    }
}

//Gets the width of the element with the given ID
export function getElementWidth(elementId: string): number {
    const element = document.getElementById(elementId);
    if (element) {
        const rect = element.getBoundingClientRect();
        return Number(rect.width);
    }
    else {
        throw new Error(`Element with ID '${elementId}' not found`);
    }
}

//Gets the height of the element with the given ID
export function getElementHeight(elementId: string): number {
    const element = document.getElementById(elementId);
    if (element) {
        const rect = element.getBoundingClientRect();
        return Number(rect.height);
    }
    else {
        throw new Error(`Element with ID '${elementId}' not found`);
    }
}

//Gets an element in SWS variable format, converts it into a variable and outputs the value of of the converted variable
export function getSimvarFromElement(inputElement: Element | null): any {
    let variableOutput: any;
    try {
        if (isNullOrWhitespace(inputElement!.attributes[1].textContent!)) {
            variableOutput = SimVar.GetSimVarValue(inputElement!.attributes[0].textContent!, inputElement!.attributes[2].textContent!);
        }
        else {
            variableOutput = SimVar.GetSimVarValue(inputElement!.attributes[0].textContent! + ":" + inputElement!.attributes[1].textContent!, inputElement!.attributes[2].textContent!);
        }
        return variableOutput;
    }
    catch (e) {
        console.dir(e);
    }
}

//Checks if the input string if null or whitespace
export function isNullOrWhitespace(inputString: string): boolean {
    return !inputString || !inputString.trim();
}

//Rounds a number to the desired precision
export function round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

//Limits an input value between a minimum and a maximum
export function clamp(inputValue: number, min: number, max: number): number {
    return Math.min(Math.max(inputValue, min), max);
}

//Normalizes a string of a number by first getting the last inputTargetLength digits of the number or the whole number if the string length is smaller inputTargetLength. Then, if needed, adds padding strings to the beginning of the string to reach the desired length.
export function normalizeNumberStringLength(inputString: string, inputTargetLength: number, inputPaddingString: string): string {
    inputString = inputString.slice(-inputTargetLength);
    if (inputString.length < inputTargetLength) {
        inputString = inputString.padStart(inputTargetLength, inputPaddingString);
    }
    return inputString;
}

//Returns a matrix, that when applied to an element, rotates angle degrees around the point with coordinates cx and cy.
export function getRotationAroundPointTransformationMatrix(cx: number, cy: number, angle: number) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        paramA = cos,
        paramB = sin,
        paramC = -sin,
        paramD = cos,
        paramE = -(cx * cos) + (cy * sin) + cx,
        paramF = -(cx * sin) - (cy * cos) + cy;
    return [paramA, paramB, paramC, paramD, paramE, paramF];
}

//Returns a transformation string that moves the element xOffset, yOffset and zOffset pixels, rotates it angle degrees according the xVectorComponent, yVectorComponent and zVectorComponent vector and scales it in 3D space according the
export function get3DTransformationString(xOffset: number = 0, yOffset: number = 0, zOffset: number = 0, xVectorComponent: number = 0, yVectorComponent: number = 0, zVectorComponent: number = 0, angle: number = 0, scaleAbscissa: number = 1, scaleOrdinate: number = 1, scaleZComponent: number = 1): string {
    let outputString: string = `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px) rotate3d(${xVectorComponent}, ${yVectorComponent}, ${zVectorComponent}, ${angle}deg) scale3d(${scaleAbscissa}, ${scaleOrdinate}, ${scaleZComponent})`;
    return outputString;
}
