// Force JIT Off immediately

var restr = null;
var timer = 0;
var debugStep = 0;

Events.run(Trigger.update, function() {
    if(Vars.state.isMenu() || restr == null) return;

    // Increment timer (60 ticks = 1 second)
    timer++;

    // --- STEP 1: Initialization (After 2 seconds) ---
    if(debugStep == 0 && timer > 120) {
        debugStep = 1;
        Vars.ui.announce("[accent]Step 1: Checking Player...");
    }

    if(debugStep == 1 && timer > 180) { // Give it a moment to announce
        var pUnit = Vars.player.unit();
        if(pUnit != null) pUnit.apply(restr, 60);
        debugStep = 2;
    }

    // --- STEP 2: Group Access (After 5 more seconds) ---
    if(debugStep == 2 && timer > 480) { // 300 ticks = 5 seconds
        debugStep = 3;
        Vars.ui.announce("[accent]Step 2: Accessing Groups...");
    }

    if(debugStep == 3 && timer > 540) {
        var unitList = Groups.unit.list; 
        var total = unitList.size; // Just reading the size
        debugStep = 4;
    }

    // --- STEP 3: The Loop (After 5 more seconds) ---
    if(debugStep == 4 && timer > 840) {
        debugStep = 5;
        Vars.ui.announce("[accent]Step 3: Entering Loop...");
    }

    if(debugStep == 5 && timer > 900) {
        var unitList = Groups.unit.list;
        for(var i = 0; i < unitList.size; i++) {
            var unit = unitList.get(i); // The most likely SIGKILL line
        }
        debugStep = 6;
        Vars.ui.announce("[green]Step 6: Success! No Crash Yet.:tm:");
    }

    // --- STEP 4: Final Logic (Constant Run) ---
    if(debugStep == 6) {
        // Run the actual mod logic once we know it's safe
        if(timer % 10 == 0) { // Every 10 frames
            var unitList = Groups.unit.list;
            for(var i = 0; i < unitList.size; i++) {
                var u = unitList.get(i);
                if(u != null && u.healthf() < 0.5) {
                    // Just testing a field read
                    var h = u.health;
                }
            }
        }
    }
});
