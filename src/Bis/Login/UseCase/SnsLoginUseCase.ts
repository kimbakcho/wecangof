import axios from "axios";

export default class SnsLoginUseCase {
    async getSnsLoginToken(signToken: string): Promise<string>{
        const { data } = await axios.get("/snsLogin/snsLoginToken",{
            params:{
                signToken: signToken
            }
        })
        return data;
    }
}
