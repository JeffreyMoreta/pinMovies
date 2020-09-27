var thumbtack = document.getElementsByClassName('fa-thumbtack');

Array.from(thumbtack).forEach(function (element) {
      element.addEventListener('click', function () {
        var title = this.parentNode.parentNode.childNodes[1].innerText;
        var year = this.parentNode.parentNode.childNodes[3].innerText;
        console.log(title, year);
        fetch('pinned', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            year: year,
          }),
        })
        .then(function (response) {
          window.location.reload();
        });
      });
    });
