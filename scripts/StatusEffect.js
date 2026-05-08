Events.run(Trigger.update, setStatus(event));
  
function setStatus(event) {
    if(Mathf.chance(2)) { 
        Vars.player.unit().apply(Vars.content.get(lost-restrained), 60)
    };

    if(!Vars.headless && this.effect !== Fx.none && !unit.inFogTo(Vars.player.team()) && unit.health / unit.maxHealth <= 0.25) {
        Tmp.v1.rnd(Mathf.range(unit.type.hitSize * 0.5));
        this.effect.at(unit.x + Tmp.v1.x, unit.y + Tmp.v1.y, 0.0, this.color, this.parentizeEffect ? unit : null);
  };
}
