// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    } 

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []

    
    }

    delete(user) {
        const filteredEntries = this.entries.filter((entry) => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }

}


//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.update()
    }

    update() {
        this.removeAllTr()
        
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de $user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')

                if(isOk) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }
    
    createRow() {
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/calebefelipe.png" alt="Imagem de CalebeFelipe">
                <a href="https://github.com/calebefelipe" target="_blank">
                    <p>Calebe Felipe</p>
                    <span>calebefelipe</span>
                </a>
            </td>
            <td class="repositories">24</td>
            <td class="followers">7</td>
            <td>
                <button class="remove">&times;</button>
            </td>
        `

        return tr
    }

    removeAllTr() {
        

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}