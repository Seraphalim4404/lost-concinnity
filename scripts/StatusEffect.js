try {
    const cx = org.mozilla.javascript.Context.getCurrentContext();
    if (cx != null) cx.setOptimizationLevel(-1);
} catch(e) {}

// Use var instead of let for top-level script variables to avoid Rhino scoping bugs
var restr = null;
var lastRun = 0;

// Use standard function() instead of arrow functions for Event proxies
Events.on(EventType.ClientLoadEvent, function() {
    restr = Vars.content.getByName(ContentType.status, "lost-restrained");
});

Events.run(Trigger.update, function() {
    // Strict null checks to prevent hidden NullPointerExceptions.
    // iOS handles NPEs across the JS/Java bridge very poorly.
    if(Vars.state.isMenu() || restr == null || Vars.player == null) return;
    Log.info("\n\n\n Function is being run\n\n\n");

    // limit updates to 12 times a second
    lastRun++;
    if(lastRun < 5) return;
    lastRun = 0;

    var pUnit = Vars.player.unit();

    // 2% 60 times a second
    if(Mathf.chance(0.02) && pUnit != null) { 
        pUnit.apply(restr, 60);
    }

    if(!Vars.headless) {
        Log.info("\n\n\nBefore Groups\n\n\n");
        var unitList = Groups.unit.list;
        var total = unitList.size;
        var pTeam = Vars.player.team();
        
        for(var i = 0; i < total; i++) {
            Log.info("Unit Iterated");
//            var unit = unitList.get(i);
            
//            if(unit != null && !unit.inFogTo(pTeam) && unit.healthf() <= 0.25) {
                
//                if(restr.effect != null && restr.effect != Fx.none) {

//                     var offsetX = Mathf.range(unit.type.hitSize * 0.5);
//                     var offsetY = Mathf.range(unit.type.hitSize * 0.5);
//                     var ex = unit.x + offsetX;
//                     var ey = unit.y + offsetY;
                    
                    // iOS CRASH FIX: 
                    // Never pass `null` as an argument to an overloaded Java method 
                    // in Rhino. It breaks RoboVM's reflection engine.
//                    if(restr.parentizeEffect) {
                        // 5 parameters (Effect.at(float, float, float, Color, Object))
//                        restr.effect.at(ex, ey, 0, restr.color, unit);
//                    } else {
                        // 4 parameters (Effect.at(float, float, float, Color))
//                        restr.effect.at(ex, ey, 0, restr.color);
//                    }
//                }
//            }
        }
        Log.info("\n\n\nAfter Groups\n\n\n");
    }
});
