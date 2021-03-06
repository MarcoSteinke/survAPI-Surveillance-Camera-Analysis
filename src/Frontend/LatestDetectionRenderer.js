/* This class manages the rendering of latest detections. If you want to change the way they are rendered, you have
 * to change this class.
 */
class LatestDetectionRenderer {

    static DISPLAY_COUNT = 10;

    // Standard method to show latest detections, where the parameter is given by the application.
    static showLatestDetections(latestDetections) {
    
        document.querySelectorAll(".detection").forEach(detection => detection.remove());
        const LATEST_DETECTION_ANCHOR = document.querySelector("#latest");
    
        latestDetections.forEach(
            detection => LATEST_DETECTION_ANCHOR.insertAdjacentHTML("beforeend", 
                `<tr class=\"detection\" onclick=\"bootbox.alert(${detection})\">\
                <td>${detection.getId()}</td>\
                <td>${detection.getObjectLabels()}</td>\
                <td>${detection.getObjectConfidences()}</td>\
                <td>${detection.dateObject.getValue()}</td>\
                <td>${detection.dateObject.getTime()}</td>\
                </tr>`)
        );
    }
}