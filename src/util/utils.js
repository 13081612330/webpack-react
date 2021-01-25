// 深复制
export function cloneObject(source, target) {  
    if (source === null || source === undefined) return source;  
    if (source === document) return;  
    if (!Object.prototype.isPrototypeOf(target)) {  
        if (HTMLElement.prototype.isPrototypeOf(source)) {  
            target = document.createElement(source.nodeName);  
        } else if (source.constructor === RegExp) {  
            target = new RegExp(source.source, source.flags);  
        } else if (source.constructor === Date) {  
            target = new Date(source);  
        } else if (source.constructor === Function) {  
            var arr = source.toString().replace(/\n|\r/g, "").trim().match(/\((.*?)\)\s*\{(.*)\}/).slice(1);  
            target = new Function(arr[0].trim(), arr[1]);  
        } else if (source.constructor === Set) {  
            target = new Set(cloneObject(Array.from(source.values())));  
        } else if (source.constructor === Map) {  
            target = new Map();  
            for (var [key, value] of source.entries()) {  
                if (Object.prototype.isPrototypeOf(key)) {  
                    if (Object.prototype.isPrototypeOf(value)) {  
                        target.set(cloneObject(key), cloneObject(value));  
                    } else {  
                        target.set(cloneObject(key), value);  
                    }  
                } else {  
                    if (Object.prototype.isPrototypeOf(value)) {  
                        target.set(key, cloneObject(value));  
                    } else {  
                        target.set(key, value);  
                    }  
                }  
            }  
        } else {  
            target = new source.constructor();  
        }  
    }  
    var names = Object.getOwnPropertyNames(source).concat(  
    Object.getOwnPropertySymbols(source)  
    );  
    for (var i = 0; i < names.length; i++) {  
        if (source.constructor === Function && names[i] === "prototype") continue;  
        var desc = Object.getOwnPropertyDescriptor(source, names[i]);  
        if (Object.prototype.isPrototypeOf(desc.value)) {  
            Object.defineProperty(target, names[i], {  
            enumerable: desc.enumerable,  
            configurable: desc.configurable,  
            writable: desc.writable,  
            value: cloneObject(desc.value),  
        });  
        } else {  
            Object.defineProperty(target, names[i], desc);  
        }  
    }  
    return target;  
}