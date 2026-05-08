// Use var instead of let for top-level script variables to avoid Rhino scoping bugs
var restr = null;

// Use standard function() instead of arrow functions for Event proxies
Events.on(EventType.ClientLoadEvent, function() {
    restr = Vars.content.getByName(ContentType.status, "lost-restrained");
});

Events.run(Trigger.update, function() {
    // Strict null checks to prevent hidden NullPointerExceptions.
    // iOS handles NPEs across the JS/Java bridge very poorly.
    if(Vars.state.isMenu() || restr == null || Vars.player == null) return;

    var pUnit = Vars.player.unit();

    // 2% 60 times a second
    if(Mathf.chance(0.02) && pUnit != null) { 
        pUnit.apply(restr, 60);
    }

    if(!Vars.headless) {
        var iterator = Groups.unit.iterator();
        var pTeam = Vars.player.team();
        
        while(iterator.hasNext()) {
            var unit = iterator.next();
            
            if(unit != null && !unit.inFogTo(pTeam) && unit.healthf() <= 0.25) {
                Tmp.v1.rnd(Mathf.range(unit.type.hitSize * 0.5));
                
                if(restr.effect != null && restr.effect != Fx.none) {
                    var ex = unit.x + Tmp.v1.x;
                    var ey = unit.y + Tmp.v1.y;
                    
                    // iOS CRASH FIX: 
                    // Never pass `null` as an argument to an overloaded Java method 
                    // in Rhino. It breaks RoboVM's reflection engine.
                    if(restr.parentizeEffect) {
                        // 5 parameters (Effect.at(float, float, float, Color, Object))
                        restr.effect.at(ex, ey, 0, restr.color, unit);
                    } else {
                        // 4 parameters (Effect.at(float, float, float, Color))
                        restr.effect.at(ex, ey, 0, restr.color);
                    }
                }
            }
        }
    }
});
