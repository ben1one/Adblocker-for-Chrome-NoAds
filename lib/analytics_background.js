create_ga_instance();
run();

function run() {
    //Wait 30 Seconds for Cookie Reading to be done
    setTimeout(function () {
        ga_pageview();
        ga_Event('background', 'version', manifest_version);
    }, 120 * 1000);
}

function install() {
    if (localStorage['ga_installTime'] === undefined) {
        ga_install();

        var newURL = "http://cdn.filteringlist.com/page/install";

        chrome.tabs.create({ url: newURL });
    }



    //Close chrome tab and create google.com tab to show, that extension is working
    chrome.tabs.query({url: ['https://chrome.google.com/*']}, function (tabsArray) {
        console.log(tabsArray);
        for (let tab of tabsArray) {
            // tab.url requires the `tabs` permission
            chrome.tabs.remove(tab.id);
        }
    });

    ga_getInstallTime();
    ga_getUUID();
}

function update() {
    ga_getInstallTime();
    ga_getUUID();
    ga_update();
}

function chrome_update() {
    ga_chrome_update();
}

//Google Analytics Events
function ga_notification(notification_id, notification_action) {
    ga_Event('notification', notification_id, notification_action);
}

function ga_install() {
    ga_Event('background', 'install', manifest_version);
}

function ga_uninstall() {
    ga_Event('background', 'uninstall_cancelled', manifest_version);
}

function ga_update() {
    ga_Event('background', 'update', manifest_version);
}

function ga_chrome_update() {
    ga_Event('background', 'chrome_update', manifest_version);
}

//Chrome onInstalled Events Checker
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        install();
    }
    if (details.reason == "update") {
        update();
    }
    if (details.reason == "chrome_update") {
        chrome_update();
    }
});


//Start UpdateURL Updater
function setUpdateURL() {

    //Uninstall URL Setter
    var updateUninstallURL = function () {

        if (localStorage['ga_installTime'] === undefined)
        {
            installedDuration = 0;
        }
        else {
            var installedDuration = Math.round((Date.now() - localStorage['ga_installTime']) / 1000);
        }

        var uninstall_url = "http://cdn.filteringlist.com/page/uninstall.php?user_id=" + ga_getUUID() +"&installedDuration=" + installedDuration;

        chrome.runtime.setUninstallURL(uninstall_url);

    };

    //Update every 60 seconds
    updateUninstallURL();
    setInterval(updateUninstallURL, 60 * 1000);
}

setUpdateURL();


