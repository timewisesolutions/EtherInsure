import {Web3Storage, Blob, File } from 'web3.storage'
import {PetInfoContextValue } from "@/context/PetInfoContext"

    function makeFileObjects (petInfo:PetInfoContextValue) {
        console.log("Web3Storage:", petInfo)
        const blob = new Blob([JSON.stringify(petInfo)], { type: 'application/json' })
        const files = []
        if (petInfo.type === 'Dog'){
            files.push(new File([blob], 'dog.json'))
        }else{
            files.push(new File([blob], 'cat.json'))
        }
        return files
    }
    
    export async function storeFile (petInfo:PetInfoContextValue) {
        const files = makeFileObjects(petInfo)
       const token  = import.meta.env.VITE_WEB3STORAGE_TOKEN
        const client = new Web3Storage({ token: token})
        const cid = await client.put(files)
        return cid
    }