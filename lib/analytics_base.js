//Consts

var ga_ua = 'UA-119685067-1';
var webstore_url_base = "https://chrome.google.com/webstore";

var manifest_version = chrome.app.getDetails().version;
var extension_id = chrome.app.getDetails().id;
var now = Date.now();



function createWebstoreURL(utm_source, utm_medium, utm_campaign,utm_term,utm_content)
{
	var url = webstore_url_base + "?utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign;
	return url;
}


function ga_getUUID()
{
	if (localStorage['ga_UUID'] === undefined)
	{
		localStorage['ga_UUID'] = generateUUID();
	}

	var ga_UUID = localStorage['ga_UUID'];
	return ga_UUID;
}

function ga_getInstallTime()
{
	if (localStorage['ga_installTime'] === undefined)
	{
		localStorage['ga_installTime'] = Date.now();
	}

	var ga_installTime = localStorage['ga_installTime'];
	return ga_installTime;
}


function create_ga_instance()
{
	//Analytics.js
	//Google Analytics Newest Version
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', ga_ua, 'auto');
	ga('require', 'displayfeatures');
	ga('set', 'checkProtocolTask', function(){});

	var uuid = ga_getUUID();
	ga('set', 'userId', uuid);
}

function ga_pageview()
{
	ga('send', 'pageview', location.href.replace(/chrome-extension:\/\/[^/]+/, ''));
}

function ga_Event(category, action, opt_label, opt_value, opt_noninteraction)
{
	ga('send', 'event', category, action, opt_label, opt_value, opt_noninteraction);
}

