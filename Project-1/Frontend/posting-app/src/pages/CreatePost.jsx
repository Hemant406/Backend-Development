import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        await axios.post("http://localhost:3000/create-post",formData)
        .then((res) => {
            alert("Post created successfully")
            navigate("/posts")
        })
        .catch((err) => {
            alert("Error creating posts");
            console.log(err);
        })
    }
  return (
    <section className='create-post-section'>
        <div className='inner'>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" name="image"/>
                <input type="text" placeholder='Enter caption here' name="caption" required />
                <button>Submit</button>
            </form>
        </div>

    </section>
  )
}

export default CreatePost