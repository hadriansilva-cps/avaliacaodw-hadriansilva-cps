import styles from "./CreatePost.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useAuthValue } from "../../context/AuthContext"


const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

        const { user } = useAuthValue()
        const { insertDocument, response} = useInsertDocument("posts")
        const navigate = useNavigate()

        const handleSubmit = (e) => {
            e.preventDefault()
            setFormError("")

                try{
                    new URL(image)
                } catch (err) {
                    setFormError("A imagem necessita ser uma URL válida", err)
                    return
                }

                const tagsArray = tags
                .split()
                .map((tag) => tag.trim().toLowerCase())

                    if(!title || !image || !body || !tags){
                    setFormError("Por favor, preecha todos os campos.")
                    return
                }
                insertDocument({
                    title,
                    image,
                    body,
                    tagsArray,
                    uid: user.uid,
                    createdBy: user.displayName
                })

                navigate("/dashboard")
            }

          return (
    <div className={styles.create_post}>
      <h2>Criar nova postagem</h2>
      <p>Escreva sobre o que quiser e compartilhe com a comunidade!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira a URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Digite o conteúdo"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Tags (separadas por vírgula):</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Ex: react, firebase, javascript"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
    
