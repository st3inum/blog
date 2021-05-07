#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;
#define ll long long
int phi(int n) {
	int p = n;
	for(int i = 2; i * i <= n; i++) {
		int c = 0;
		while(n % i == 0)n /= i, c++;
		if(c)p = p / i * (i - 1);
	}
	if(n != 1)p = p / n * (n - 1);
	return p;
}
int pow(int a, int b, int m) {
	int r = 1;
	while(b) {
		if(b & 1)r = 1LL * r * a % m;
		a = 1LL * a * a % m;
		b >>= 1;
	}
	return r;
}
int32_t main() {
	ios_base::sync_with_stdio(0);
	cin.tie(0);

	int t, tc = 1;
	cin >> t;
	while(t--) {
		int a, b, c, p;
		cin >> a >> b >> c >> p;
		int g = __gcd(a, b);
		a /= g, b /= g;
		int ai = pow(a, phi(b) - 1, b), bi = pow(b, phi(a) - 1, a);
		ll ans = 0;
		for(int cz = 0; cz <= p; cz += c) {
			int pi = p - cz;
			if(pi % g != 0)continue;
			pi /= g;
			ll up = pi - (1LL * ai * pi % b) * a - (1LL * bi * pi % a) * b + 1LL * a * b;
			ll down = 1LL * a * b;
			ans += up / down;
		}
		cout << "Case " << tc++ << ": " << ans << '\n';
	}
}