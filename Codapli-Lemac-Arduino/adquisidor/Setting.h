
#ifndef Setting_h
#define Setting_h

class Setting
{

private:
    float calibration_factor_celda;
    int calibration_factor_ldvt0;
    int calibration_factor_ldvt1;

public:
    Setting();
    void setCalibration_factor_celda(float factor);
    float getCalibration_factor_celda();
    void setCalibration_factor_ldvt0(int value);
    int getCalibration_factor_ldvt0();
    void setCalibration_factor_ldvt1(int value);
    int getCalibration_factor_ldvt1();
};

#endif

