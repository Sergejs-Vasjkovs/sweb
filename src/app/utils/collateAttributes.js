const collateAttributes = (attributes) => {
    const filteredAttributes = [];

    attributes.forEach((product) => {
        product.attributes.forEach((attribute) => {
            const attributeName = attribute.name;
            const attributeItems = attribute.items;

            const filteredAttribute = filteredAttributes.find((item) => item.name === attributeName);

            if (filteredAttribute) {
                attributeItems.forEach((item) => {
                    if (!filteredAttribute.items.some((i) => i.value === item.value)) {
                        filteredAttribute.items.push(item);
                    }
                });
            } else {
                filteredAttributes.push({ name: attributeName, items: [...attributeItems] });
            }
        });
    });

    return filteredAttributes;
};

export default collateAttributes;
