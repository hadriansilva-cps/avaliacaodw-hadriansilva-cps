import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"

const Dashboard = () => {
    const { user } = useAuthValue()
    const uid = user.uid

    const { documents: posts, loading } = useFetchDocuments("posts", null, uid)
    const { deleteDocument } = useDeleteDocument("posts")

    return(
        <div className={styles.dashboard}>
            <h2>Meus posts</h2>
            <p>Gereciar seus posts</p>

            {loading &&  <p>Carregando....</p>}

            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Você ainda não criou um post.</p>
                    <Link to="/posts/create" className="btn">Criar primeiro post</Link>
                </div>
            ) : (
                <div className={styles.post_header}>
                    <span>Título</span>
                    <span>Ações</span>
                </div>
            )}

            {posts && posts.map((post => (
                <div key={post.id} className={styles.post_row}>
                    <p>{post.title}</p>
                    <div>
                       <Link to={`/posts/${posts.id}`} className="btn btn-outline">ver</Link> 
                       <Link to={`/posts/${posts.id}`} className="btn btn-outline">Editar</Link>
                       <button onClick={() => deleteDocument(post.id)} className="btn btn-danger">Excluir</button>
                    </div>

                </div>
            )))}
        </div>
    )
}

export default Dashboard