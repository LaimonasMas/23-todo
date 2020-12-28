class Todo {
    constructor(params) {
        this.selector = params.selector;

        this.DOM = null;
        this.taskList = [];

        this.editForm = null;
    }

    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.updateStyle();
    }

    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

    updateStyle() {
        if (!this.DOM.classList.contains('list')) {
            this.DOM.classList.add('list')
        }
    }

    // CRUD: create
    addTask(task) {
        this.taskList.push(task);
        this.renderList();
        return true;
    }

    generateItem(task) {
        return `<div class="item">
                    <p>${task.text}</p>
                    <div class="actions">
                        <div class="btn small edit">Edit</div>
                        <div class="btn small remove">Remove</div>
                    </div>
                </div>`;
    }

    // CRUD: read
    renderList() {
        let HTML = '';
        for (let item of this.taskList) {
            HTML += this.generateItem(item);
        }
        this.DOM.innerHTML = HTML;
        this.addEvents();
    }

    // CRUD: update
    updateTask(itemIndex, newText) {
        this.taskList[itemIndex].text = newText;
        this.renderList();
    }

    // CRUD: delete
    deleteTask(taskIndex) {
        this.taskList = this.taskList.filter((item, index) => index !== taskIndex);
        this.renderList();
    }

    addEvents() {
        const items = this.DOM.querySelectorAll('.item');

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const editBtn = item.querySelector('.btn.edit');
            const removeBtn = item.querySelector('.btn.remove');

            editBtn.addEventListener('click', () => {
                this.editForm.show(i);
            })
            removeBtn.addEventListener('click', () => {
                this.deleteTask(i);
            })
        }
    }
}

export { Todo }