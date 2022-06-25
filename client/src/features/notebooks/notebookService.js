import axios from 'axios'

const url = 'http://localhost:5000/api/notebooks'

export const getAllNotebooks = async () => {
    const response = await axios.get(url)
    return response.data
}

export const getNotebookNotes = async (id) => {
    const response = await axios.get(`${url}/notebook-notes/${id}`)
    return response.data
}

export const addNewNotebook = async (newNotebook) => {
    const response = await axios.post(url, newNotebook)
    return response.data
}

export const renameNotebook = async (obj) => {
    let { _id } = obj
    const response = await axios.patch(`${url}/rename/${_id}`, obj)
    return response.data
}

export const deleteNotebook = async (id) => {
    const response = await axios.delete(`${url}/delete/${id}`)
    return response.data
}

export const addNoteToNotebook = async (obj) => {
    let { notebookID } = obj
    const response = await axios.post(`${url}/add-note/${notebookID}`, obj)
    return response.data
}

export const deleteNoteInNotebook = async (obj) => {
    let { notebookID } = obj
    const response = await axios.patch(`${url}/delete-note/${notebookID}`, obj)
    return response.data
}


