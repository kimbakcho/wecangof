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
        // if(window.navigator.userAgent.indexOf("wecango") == -1){
        //     window.location.href=linkUrl
        // }else {
        //     _this.$router.push({
        //         path: "/linkBoard",
        //         query: {
        //             linkUrl: linkUrl
        //         }
        //     })
        // }

    }
    return {
        toHTMLRenderers: {
            innerLink(node: MdNode) {
                let text = ""
                let link = ""
                setTimeout(() => {
                    const querySelector1 = document.querySelector(`.innerLinkBox${node.id}`);
                    if(querySelector1){
                        querySelector1.addEventListener('click',evt => {
                            innerLinkClick(link)
                        });
                    }
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
                    {type: 'openTag', tagName: 'span', classNames: [`innerLinkBox${node.id}`,'innerLinkBox']},
                    {type: 'html', content: `<span class="innerLink"> ${text} </span>`},
                    {type: 'closeTag', tagName: 'span' }
                ]
            }
        },
    }
}
