import axios from 'axios'

const url = 'http://localhost:5000/api/notes'

export const getAllNotes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(url, config)
    return response.data
}

export const addNewNote = async (newNote, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(url, newNote, config)
    return response.data
}

export const editNote = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { _id } = obj
    const response = await axios.patch(`${url}/edit/${_id}`, obj, config)
    return response.data
}

export const changeNotebook = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { _id } = obj
    const response = await axios.patch(`${url}/change-notebook/${_id}`, obj, config)
    return response.data
}

export const moveNoteToTrash = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { _id } = obj
    const response = await axios.patch(`${url}/trash/${_id}`, obj, config)
    return response.data
}

export const restoreNote = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { _id } = obj
    const response = await axios.patch(`${url}/restore/${_id}`, obj, config)
    return response.data
}

export const deleteNote = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.delete(`${url}/delete/${id}`, config)
    return response.data
}





