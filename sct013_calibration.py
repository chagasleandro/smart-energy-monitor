"""Ajuda a calcular valores para o circuito com SCT-013.
Exemplo de uso: ajustar CT_RATIO e SENSOR_R_LOAD no esp32/config.py baseado no seu hardware.
"""
def calc_current(voltage_across_r_load, r_load, ct_turns=1):
    # corrente no secundario = V_rload / R_load
    # corrente primária = corrente_sec * (1) * (depends on sensor)
    return voltage_across_r_load / r_load

if __name__ == '__main__':
    print('Exemplo: se medir 0.1V RMS em R_load=33Ω, corrente secundária = 0.1/33 A =', calc_current(0.1,33))
