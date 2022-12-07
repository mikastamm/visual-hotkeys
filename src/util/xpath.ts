export interface IPageContentExtractor {
    getElement(selector): HTMLElement;
    getElements(selector): HTMLElement[];
    getSelectorForElement(element)
}

export class XpathPageContentExtractor implements IPageContentExtractor{

    getElement(selector): HTMLElement {
        let result = document.evaluate(
            selector,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        return result as HTMLElement;
    }

    getElements(selector: string): HTMLElement[] {
        // Use the document.evaluate method to find the elements that match the given xpath
        const result = document.evaluate(
            selector,
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

    getSelectorForElement (element) {
        if (!element) return null

        if (element.id) {
            return `//*[@id="${element.id}"]`
        } else if (element.tagName === 'BODY') {
            return '/html/body'
        } else {
            const sameTagSiblings = Array.from(element.parentNode.childNodes)
                .filter(e => (e as any).nodeName === element.nodeName)
            const idx = sameTagSiblings.indexOf(element)

            return this.getSelectorForElement(element.parentNode) +
                '/' +
                element.tagName.toLowerCase() +
                (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
        }
    }

}