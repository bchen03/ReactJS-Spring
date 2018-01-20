package com.greglturnquist.payroll;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by Benny on 1/20/2018.
 */
@Component
public class Environment {
    @Value("${filespath}")
    public String filesPath;

}
