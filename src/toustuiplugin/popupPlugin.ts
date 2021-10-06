import {MdNode, PluginContext, PluginInfo} from "@toast-ui/editor";

export function popupPlugin (context: PluginContext,options: any ): PluginInfo{
    const _this = options.context;
    function popupClick(title: string,value: string){
        console.log(value)
        _this.$swal.fire({
            title: title,
            // text: value,
            html: value
        })
    }
    return {
        toHTMLRenderers: {
            popup(node: MdNode) {
                let text = ""
                let title = ""
                let content = ""

                setTimeout(() => {
                    const querySelector: NodeListOf<HTMLDivElement> = document.querySelectorAll(".popupBox");
                    querySelector.forEach(elem =>{
                        elem.addEventListener('click',evt => {
                            popupClick(title,content)
                        });
                    })
                });
                const split = node.literal!.split("\n");

                split.forEach(x=>{
                    if(x.length> 0 ){
                        const values = x.split("$");
                        const key = values[0];
                        const value = values[1];
                        if(key == "text"){
                            text = value
                        }else if(key == "title"){
                            title = value
                        }else if(key == "content"){
                            content = value
                        }
                    }
                })
                return [
                    {type: 'openTag', tagName: 'span', outerNewLine: true, classNames: ['popupBox']},
                    {type: 'html', content: `<span class="popup"> ${text} </span>`},
                    {type: 'closeTag', tagName: 'span', outerNewLine: true}
                ]
            }
        },
    }
}
