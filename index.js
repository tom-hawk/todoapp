const list = document.querySelector('.todos');

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
}

$('#addTask').click(function() {
    var addTask = document.querySelector('.add');
    var task = addTask.task.value.trim();
    var priority = addTask.priority.value.trim();
    var deadline = addTask.deadline.value.trim();
    var other = addTask.other.value.trim();
    if (task.length) {
        let color = "text-success";
        if (priority == "緊急") { color = "text-danger"; } else if (priority == "高") { color = "text-warning" } else if (priority == "低") { color = "text-info" } else if (priority == "最低") { color = "text-primary" }

        var html = `
        <tr name="${task}">
            <td> ${task}</td>
            <td class="${color}">${priority}</td>
            <td>${deadline}</td>
            <td>${other}</td>
            <td style="width:140px">
                <button class="complete btn btn-success" id="${task}" data-toggle="button" aria-pressed="false" autocomplete="off">完了</button>
                <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="${task}">削除</button>
            </td>
        </tr>
        `;

        list.innerHTML += html;
        addTask.reset();
    }
})


$(document).on('click', '.complete', function() {
    var task = $(this).attr("id");
    var button = document.getElementById(task);
    if ($(this).attr("aria-pressed") == "true") {
        document.getElementsByName(task)[0].style.background = "#9fc"
        button.innerText = "取消";

    } else {
        document.getElementsByName(task)[0].style.background = "white"
        button.innerText = "完了";
    }

});

$('#deleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) //モーダルを呼び出すときに使われたボタンを取得
    var recipient = button.data('id')
    var modal = $(this)
    modal.find('.modal-footer button#delete').val(recipient)
})

$('#delete').click(function() {
    let id = document.getElementById("delete").value;
    document.getElementById(id).parentNode.parentNode.remove()
})