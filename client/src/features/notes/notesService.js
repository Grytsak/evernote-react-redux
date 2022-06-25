import axios from 'axios'

const url = 'http://localhost:5000/api/notes'

export const getAllNotes = async () => {
    const response = await axios.get(url)
    return response.data
}

export const addNewNote = async (newNote) => {
    const response = await axios.post(url, newNote)
    return response.data
}

export const editNote = async (obj) => {
    const { _id } = obj
    const response = await axios.patch(`${url}/edit/${_id}`, obj)
    return response.data
}

export const changeNotebook = async (obj) => {
    const { _id } = obj
    const response = await axios.patch(`${url}/change-notebook/${_id}`, obj)
    return response.data
}

export const moveNoteToTrash = async (obj) => {
    const { _id } = obj
    const response = await axios.patch(`${url}/trash/${_id}`, obj)
    return response.data
}

export const restoreNote = async (obj) => {
    const { _id } = obj
    const response = await axios.patch(`${url}/restore/${_id}`, obj)
    return response.data
}

export const deleteNote = async (id) => {
    const response = await axios.delete(`${url}/delete/${id}`)
    return response.data
}





