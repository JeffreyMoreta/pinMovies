var thumbtack = document.getElementsByClassName('fa-thumbtack');
var trash = document.getElementsByClassName('fa-trash');

Array.from(thumbtack).forEach(function (element) {
      element.addEventListener('click', function () {
        var title = this.parentNode.parentNode.childNodes[1].innerText;
        var year = this.parentNode.parentNode.childNodes[3].innerText;
        console.log(title, year);
        fetch('messages', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            year: year,
            pinned: true,
          }),
        })
        .then(function (response) {
          if (response.ok) return response.json();
        })
        .then(function (data) {
          console.log(data);
          window.location.reload(true);
        });
      });
    });

Array.from(trash).forEach(function (element) {
      element.addEventListener('click', function () {
        var name = this.parentNode.parentNode.childNodes[1].innerText;
        var msg = this.parentNode.parentNode.childNodes[3].innerText;
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            msg: msg,
          }),
        }).then(function (response) {
          window.location.reload();
        });
      });
    });
