class LatestDetectionRenderer {

    static showLatestDetections(latestDetections) {
    
        document.querySelectorAll(".detection").forEach(detection => detection.remove());
        const LATEST_DETECTION_ANCHOR = document.querySelector("#latest");
    
        latestDetections.forEach(
            detection => LATEST_DETECTION_ANCHOR.insertAdjacentHTML("beforeend", 
                `<tr class=\"detection\" onclick=\"details(${detection.getId()})\">\
                <td>${detection.getId()}</td>\
                <td>${detection.getObjectLabels()}</td>\
                <td>${detection.getObjectConfidences()}</td>\
                <td>${detection.dateObject.getValue()}</td>\
                <td>${detection.dateObject.getTime()}</td>\
                </tr>`)
        );
    }
}