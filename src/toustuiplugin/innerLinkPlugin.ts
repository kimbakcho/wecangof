import {MdNode, PluginContext, PluginInfo} from "@toast-ui/editor";

export function innerLinkPlugin(context: PluginContext,options: any): PluginInfo {
    const _this = options.context;
    function innerLinkClick(linkUrl: string) {
        _this.$router.push({
            path: "/linkBoard",
            query: {
                linkUrl: linkUrl
            }
        })
    }
    return {
        toHTMLRenderers: {
            innerLink(node: MdNode) {
                let text = ""
                let link = ""

                setTimeout(() => {
                    const querySelector: NodeListOf<HTMLDivElement> = document.querySelectorAll(".innerLinkBox");
                    querySelector.forEach(elem =>{

                        elem.addEventListener('click',evt => {
                            innerLinkClick(link)
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
                        }else if(key == "link"){
                            link = value
                        }
                    }
                })
                return [
                    {type: 'openTag', tagName: 'span', classNames: ['innerLinkBox']},
                    {type: 'html', content: `<span class="innerLink"> ${text} </span>`},
                    {type: 'closeTag', tagName: 'span' }
                ]
            }
        },
    }
}