import { AlbumModel } from '../types/AlbumModel'
import { apiEndpoint } from '../config'
import { AlbumUploadInfo } from '../types/AlbumUploadInfo'
import {UpdateAlbum} from '../types/UpdateAlbum'
import Axios from 'axios'
import { UpdateAlbumInfo } from '../types/UpdateAlbumInfo'
import { pathToFileURL } from 'url'
export async function getAlbums(idToken: string): Promise<AlbumModel[]> {
  console.log('Fetching albums')


  const response = await Axios.get(`${apiEndpoint}/albums`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  // const response = await fetch(`${apiEndpoint}/albums`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  // })

  //const result = await response.json()

  return response.data.items//result.items
}

export async function getAlbum(albumId: string, idToken: string): Promise<AlbumModel> {
  console.log('Fetching Album')



  const response = await Axios.get(`${apiEndpoint}/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  
  // await fetch(`${apiEndpoint}/albums/${albumId}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  // })
  // const result = await response.json()
  // console.log(JSON.stringify(result))

  return response.data.album//result.album
}

export async function createAlbum(
  idToken: string,
  newAlbum: AlbumUploadInfo,
  
): Promise<AlbumModel> {
   
  const reply = await Axios.post(`${apiEndpoint}/albums`,  JSON.stringify({name:newAlbum.name,location:newAlbum.location,description:newAlbum.details}), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  // await fetch(`${apiEndpoint}/albums`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  //   body:JSON.stringify({//test
  //     name: newAlbum.name,
  //     location:newAlbum.location,
  //     description: newAlbum.details
  //     //newAlbum.location
  //   })
  // })
  //const result = await reply.json()
  return reply.data.item   //result.newItem
}

export async function deleteAlbum(albumId: string, idToken: string): Promise<void> 
{
  await Axios.delete(`${apiEndpoint}/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}
//   console.log('Deleting album')

//   await fetch(`${apiEndpoint}/albums/${albumId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     },
//   })
// }

export async function editAlbum(albumId: string, idToken: string,patch:UpdateAlbumInfo): 

  Promise<void> {
    await Axios.patch(`${apiEndpoint}/albums/${albumId}`, JSON.stringify(patch), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })
  // await fetch(`${apiEndpoint}/albums/${albumId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  // })
}

export async function updateImageCounter(albumId: string, idToken: string): 

  Promise<void> {

    console.log('ambum id:',albumId)
    console.log(' Token:',idToken)
    const reply = await Axios.post(`${apiEndpoint}/albums/${albumId}/counter`,  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })

    console.log('reply:',reply);
  }

export async function saveAlbum(albumId: string, idToken: string,patch:UpdateAlbumInfo): 

  Promise<void> {

    const reply = await Axios.post(`${apiEndpoint}/albums/${albumId}/save`, {name:patch.name,description:patch.details,location:patch.location}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })

    return reply.data.items
    
  // await fetch(`${apiEndpoint}/albums/${albumId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  // })
}