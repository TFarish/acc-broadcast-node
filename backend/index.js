const ACCNodeWrapper = require('acc-node-wrapper')
const broadcasting = new ACCNodeWrapper()

/**
 * @name initBroadcastSDK
 * @comment This is the init function for the ACC Node Wrapper. This inits the Broadcast SDK.
 * @param SERVER_DISPLAYNAME
 * @param SERVER_IP
 * @param SERVER_PORT
 * @param SERVER_PASS
 * @param SERVER_COMMANDPASS
 * @param UPDATE_INTERVAL
 * @param Logging
 */
broadcasting.initBroadcastSDK("Max", "127.0.0.1", 9000, "asd", "", 1000, false);

broadcasting.on("REGISTRATION_RESULT", result => {
    //console.log(result)
})

broadcasting.on("BROADCASTING_EVENT", result => {
    //console.log(result);
    if (result.Type === 'BestSessionLap') {
        if (result.CarData) {
            currentDriver = result.CarData.CurrentDriverIndex
            firstName = result.CarData.Drivers[currentDriver].FirstName
            lastName = result.CarData.Drivers[currentDriver].LastName
            console.log("New Fastest Lap by: " + firstName, lastName, "Time: " + result.Msg);
            console.log(result.CarData.Drivers[currentDriver]);
        }
    } else {
        //console.log(result);
    }
})

broadcasting.RequestEntryList();

broadcasting.on("ENTRY_LIST", result => {
    return result;
});


/**
 * @name getSessionDetails
 * @comment Gets the latest cameras from the server, returns it.
 * @returns {Promise<any>}
 */



broadcasting.on("REALTIME_UPDATE", result => {
    // Log Camera
    //console.log(result);
    //console.log(result);
    // Current Camera Set: ActiveCameraSet
    // Current Page: CurrentHudPage
    // Current Driver = FocusedCarIndex
    // Best Lap So far = BestSessionLap.LapTimeMS;
    // Log it out

    console.log("Current Camera: " + result.ActiveCameraSet);
    console.log("Current Page: " + result.CurrentHudPage);
    console.log("Current Driver: " + result.FocusedCarIndex);
    // Get driver from result.CarData.Drivers[result.FocusedCarIndex]
    return result;
});

broadcasting.on("REALTIME_CAR_UPDATE", result => {
    //console.log(result)
    entrylist = result.Msg

    // for car in entrylist list drivers

    if (entrylist > 0) {
        for (var i = 0; i < entrylist.length; i++) {
            // for each driver in entrylist list details
            // check if Drivers is above 0
            if (entrylist[i].Drivers.length > 0) {
                for (var j = 0; j < entrylist[i].Drivers.length; j++) {
                    // if driver is current driver
                    if (entrylist[i].Drivers[j].CurrentDriverIndex == true) {
                        // set current driver details
                        currentDriver = j
                        firstName = entrylist[i].Drivers[j].FirstName
                        lastName = entrylist[i].Drivers[j].LastName
                        console.log("Current Driver: " + firstName, lastName);
                    }
                }
            }
        }
    }
})

/*broadcasting.on("REALTIME_CAR_UPDATE", result => {
    console.log(result.CarIndex, "Gear: " + result.Gear, "KMH: " + result.Kmh, "Position: " + result.Position, "Laps: " + result.Laps)
})*/

/*broadcasting.on("BROADCASTING_EVENT", result => {
    console.log(result)

})*/

// get track data
/*broadcasting.on("TRACK_DATA", result => {
    console.log(result)
})*/
