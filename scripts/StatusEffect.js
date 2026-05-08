const restr = Vars.content.getByName(ContentType.status, "lost-restrained");

Events.run(Trigger.update, () => {
    if(Vars.state.isMenu() || !restr) return;

    if(Mathf.chance(0.02) && Vars.player.unit() != null) { 
        Vars.player.unit().apply(restr, 60);
    };

    if(!Vars.headless) {
        Groups.unit.each(unit => {
            if(!unit.inFogTo(Vars.player.team()) && unit.healthf() <= 0.25) {
                Tmp.v1.rnd(Mathf.range(unit.type.hitSize * 0.5));
                
                if(restr.effect !== Fx.none) {
                    restr.effect.at(
                        unit.x + Tmp.v1.x, 
                        unit.y + Tmp.v1.y, 
                        0, 
                        restr.color, 
                        restr.parentizeEffect ? unit : null
                    );
                }
            }
        });
    }
});
