
export function getElementByXpath(xpath): HTMLElement {
    let result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    return result as HTMLElement;
}

export function getElementsByXpath(xpath: string): HTMLElement[] {
    // Use the document.evaluate method to find the elements that match the given xpath
    const result = document.evaluate(
        xpath,
        document
    );

    // Create an empty array of Element types
    const elements: HTMLElement[] = [];

    // Iterate over the result object and add each element to the elements array
    let element = result.iterateNext();
    while (element) {
        elements.push(element as HTMLElement);
        element = result.iterateNext();
    }

    // Return the elements array
    return elements;
}

export function getRelativeElementByXpath(
    relativeTo: HTMLElement,
    xpath: string
): HTMLElement {
    // Use the document.evaluate method to find the element that matches the given xpath, relative to the given element
    const element = document.evaluate(
        getElementXPath(relativeTo) + xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
    // Return the element
    return element as HTMLElement;
}

function getElementXPath (element) {
    if (!element) return null

    if (element.id) {
        return `//*[@id="${element.id}"]`
    } else if (element.tagName === 'BODY') {
        return '/html/body'
    } else {
        const sameTagSiblings = Array.from(element.parentNode.childNodes)
            .filter(e => (e as any).nodeName === element.nodeName)
        const idx = sameTagSiblings.indexOf(element)

        return getElementXPath(element.parentNode) +
            '/' +
            element.tagName.toLowerCase() +
            (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
    }
}
