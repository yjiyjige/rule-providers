function main(config, profileName) {
  // 找出代理中的美国代理，然后添加一个专用的代理组
  const proxies = config["proxies"] || [];
  const usaProxies = proxies
    .filter((p) => typeof p.name === "string" && p.name.startsWith("美国"))
    .map((p) => p.name);
  config["proxy-groups"] = config["proxy-groups"] || [];
  config["proxy-groups"].push({
    name: "🇺🇸 美国专用",
    type: "select",
    proxies: usaProxies,
  });

  // 创建自定义的规则，注意插入到rules最前才能保证规则生效
  config["rules"] = config["rules"] || [];
  config["rules"].unshift("RULE-SET,ForUSA,🇺🇸 美国专用");
  config["rule-providers"] = config["rule-providers"] || {};
  config["rule-providers"]["ForUSA"] = {
    type: "http",
    behavior: "classical",
    url: "https://raw.githubusercontent.com/yjiyjige/rule-providers/refs/heads/main/usa.yaml",
    path: "./ruleset/ForUSA.yaml",
    interval: 86400,
  };

  return config;
}
