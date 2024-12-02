const __element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
const container = document.getElementById("root")
render(__element, container)

// 编译后
const _element = React.createElement(
    'div',
    {
        id: 'foo',
    },
    React.createElement('a', null ,'bar'),
    React.createElement('b', null , null).
)

function createElement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child)),
        }
    }
}

function createTextElement(text){
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function render(element, container){
    const dom = element.type === 'TEXT_ELEMENT'? document.createTextNode('') : document.createElement(element.type);

    
}