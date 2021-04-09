function setDefaultManifest() {
    var defaultManifest = {
      "name": "Custom Profile PWA",
      "short_name": "Custom Profile PWA",
      "description": "Test app for exercising PWA functionality",
      "categories": ["utilities", "productivity"],
      "start_url": "https://mhochk.github.io/custom-manifest-pwa/?custom_param=start_url_value",
      "scope":"https://mhochk.github.io/custom-manifest-pwa/",
      "display": "minimal-ui",
      "orientation": "portrait",
      "icons": [
        {
          "src": "https://mhochk.github.io/custom-manifest-pwa/CustomBlack.png",
          "sizes": "150x150",
          "type": "image/png"
        }
      ],
      "share_target": {
        "action": "https://mhochk.github.io/custom-manifest-pwa/?custom_param=share_target_value",
        "method": "POST",
        "enctype": "multipart/form-data",
        "params": {
          "title": "mapped_title",
          "text": "mapped_text",
          "url": "mapped_url",
          "files": [
            {
              "name": "mapped_files",
              "accept": ["image/jpeg"]
            }
          ]
        }
      },
      "file_handlers": [
        {
          "action": "https://mhochk.github.io/custom-manifest-pwa/?custom_param=csv_file_handler",
          "accept": {
            "text/csv": ".csv"
          }
        },
        {
          "action": "https://mhochk.github.io/custom-manifest-pwa/?custom_param=jpeg_file_handler",
          "accept": {
            "image/jpeg": [ ".jpg", ".jpeg" ]
          }
        },
        {
          "action": "https://mhochk.github.io/custom-manifest-pwa/?custom_param=graph_file_handler",
          "accept": {
            "application/vnd.grafr.graph": [ ".grafr", ".graf" ],
            "application/vnd.alternative-graph-app.graph": ".graph"
          }
        }
      ],
      "related_applications": [
        {
          "platform": "browser",
          "id": "Microsoft.MicrosoftEdge.Stable_8wekyb3d8bbwe"
        },
        {
          "platform": "browser",
          "id": "Microsoft.MicrosoftEdge.Canary_8wekyb3d8bbwe"
        }
      ]
    };
    localStorage.setItem('manifestText', JSON.stringify(defaultManifest, null, " "));
}

document.addEventListener('DOMContentLoaded', ()=> {
    // Hook up the buttons
    document.getElementById("update").addEventListener("click", () => {
        localStorage.setItem('manifestText', document.getElementById("manifestText").value);
        location.reload();
    });
    document.getElementById("reset").addEventListener("click", () => {
        setDefaultManifest();
        location.reload();
    });
    
    // Add the manifest early so it is noticed automatically
    document.head.innerHTML += "<link rel='manifest' href='data:application/manifest+json," + localStorage.getItem('manifestText').replaceAll("'", "&apos;")  + "'>";
    document.getElementById("manifestText").value = localStorage.getItem('manifestText');

    // Register the service worker
    if ('serviceWorker' in navigator) { 
        navigator.serviceWorker.register('service-worker.js')
        .then ((reg) => { 
            console.log('serviceWorker.register successfully returned: ', reg); 
        }).catch((e) => { 
            console.error('serviceWorker.register returned failure: ', e); 
        }); 
    }    
})

// Establish the default manifest value to use, if not already defined
if (!localStorage.getItem('manifestText')) {
    setDefaultManifest();
}




