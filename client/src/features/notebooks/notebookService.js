import axios from 'axios'

// const url = 'http://localhost:5000/api/notebooks'
const url = '/api/notebooks'

export const getAllNotebooks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(url, config)
    return response.data
}

export const getNotebookNotes = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(`${url}/notebook-notes/${id}`, config)
    return response.data
}

export const addNewNotebook = async (newNotebook, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(url, newNotebook, config)
    return response.data
}

export const renameNotebook = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    let { _id } = obj
    const response = await axios.patch(`${url}/rename/${_id}`, obj, config)
    return response.data
}

export const deleteNotebook = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.delete(`${url}/delete/${id}`, config)
    return response.data
}

export const addNoteToNotebook = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    let { notebookID } = obj
    const response = await axios.post(`${url}/add-note/${notebookID}`, obj, config)
    return response.data
}

export const deleteNoteInNotebook = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    let { notebookID } = obj
    const response = await axios.patch(`${url}/delete-note/${notebookID}`, obj, config)
    return response.data
}


