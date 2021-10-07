import {UploadFileResDto} from "@/Bis/Common/UploadFileResDto";
import axios, {AxiosResponse} from "axios";
import Vue from "vue";

export default class FileUploadService {
    async upload(vm: Vue,file: File): Promise<UploadFileResDto|null>{
        if(file.size > 1048576){
            vm.$swal("파일사이즈가 너무 큽니다.")
            return null;
        }

        const formData = new FormData()
        formData.append("file",file);
        const formDataAxiosResponse = await axios.post<FormData,AxiosResponse>("/imageUpload",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return formDataAxiosResponse.data;
    }
}
