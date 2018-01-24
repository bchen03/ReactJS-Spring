package com.greglturnquist.payroll;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Environment {
    @Value("${filespath}")
    public String filesPath;

    @Value("${urlpath}")
    public String urlPath;
}
