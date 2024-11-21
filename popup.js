const optlist = ['newtab', 'defaultfont', 'checkip', 'hideblock', 'blockmobile', 'nickid', 'pagination', 'darkmode', 'refresh', 'refreshtime'];

function saveOptions() {
    var setting = {};

    for (var i = 0; i < optlist.length; i++) {
        if (optlist[i] == 'refreshtime') {
            setting['refreshtime'] = document.getElementById(optlist[i]).value;
        }
        setting['is' + optlist[i]] = document.getElementById(optlist[i]).checked;
        setting['ishideblock'] = true;
    }

    chrome.storage.local.set(setting, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function loadOptions() {
    chrome.storage.local.get(null, function(items) {
        for (var i = 0; i < optlist.length; i++) {
            if (optlist[i] == 'refreshtime') {
                if (items['isrefresh'] == true) {
                    document.getElementById('refresh').checked = true;
                    document.getElementById('refreshtime').style.display = 'inline-block';
                    document.getElementById('refreshtime').value = items['refreshtime'];
                } else {
                    document.getElementById('refresh').checked = false;
                    document.getElementById('refreshtime').style.display = 'none';
                }
            } else if(optlist[i] == 'hideblock'){
                document.getElementById('hideblock').checked = true;
            } else if ('is' + optlist[i] in items) {
                document.getElementById(optlist[i]).checked = items['is' + optlist[i]];
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var refresh = document.getElementById('refresh');

    //refresh option
    refresh.addEventListener("change", function() {
        if (this.checked) {
            document.getElementById('refreshtime').style.display = 'inline-block';
        } else {
            document.getElementById('refreshtime').style.display = 'none';
        }
    });

    loadOptions();

    document.getElementById('save').onclick = saveOptions;
});