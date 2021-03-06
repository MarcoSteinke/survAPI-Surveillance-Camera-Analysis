class CameraListRenderer {

    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;

    }

    static renderCameraList(cameras) {
        cameras.forEach(
            camera => document.querySelector("#cameras").insertAdjacentHTML(
                "beforeend", 
                `<div class=\"col\">\
                <div class=\"card other-camera\" onclick=\"\">\
                  <div class=\"card-body\">\
                    <h5 class=\"card-title\">${camera.name}</h5>\
                    <p class=\"card-text\">${[camera.getIp(), camera.getPort()].join(':')}</p>\
                    <p class=\"card-text\">${camera.description}</p>\
                  </div>\
                </div>\
              </div>`
            )
        )
    }
}

const cameras = [
    new Camera(0, "Front Door", "Camera in the left corner.", CameraConfiguration.createIPCamera("1.1.1.1", 42, 480)),
    new Camera(1, "Front Door 2", "Camera in the right corner.", CameraConfiguration.createIPCamera("1.1.1.2", 42, 480)),
    new Camera(2, "Hallway", "In front of the cafeteria", CameraConfiguration.createIPCamera("1.1.1.3", 42, 360)),
];

CameraListRenderer.renderCameraList(cameras);