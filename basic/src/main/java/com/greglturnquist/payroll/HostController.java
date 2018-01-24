package com.greglturnquist.payroll;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class HostController {
    @RequestMapping("/api/hosts")
    public String getHost(HttpServletRequest httpServletRequest) {

        String host = httpServletRequest.getRequestURL().toString().replace("/api/hosts", "");
        return host;
    }


}
