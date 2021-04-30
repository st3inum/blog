#include <iostream>
#include <cassert>
using namespace std;

const int mx = 1e6 + 2;
int F[mx] = {1};
int p, e, pe;
long long euclid(long long a, long long b, long long &x, long long &y) {
	if (b) {
		long long d = euclid(b, a % b, y, x);
		return y -= a / b * x, d;
	}
	return x = 1, y = 0, a;
}
long long crt(long long a, long long m, long long b, long long n) {
	if (n > m) swap(a, b), swap(m, n);
	long long x, y, g = euclid(m, n, x, y);
	assert((a - b) % g == 0); // else no solution
	x = (b - a) % n * x % n / g * m + a;
	return x < 0 ? x + m * n / g : x;
}
int Pow(int a, int b, int m) {
	int r = 1; while (b) {
		if (b & 1)r = 1LL * r * a % m;
		a = 1LL * a * a % m;
		b >>= 1;
	} return r;
}
long long legender(long long n, int p) {
	long long r = 0;
	while (n) n /= p, r += n;
	return r;
}
int normalize(int i, int p) {
	while (i % p == 0)i /= p; return i;
}
int f(long long n) {
	if (n < pe)return F[n];
	return 1LL * (1LL * f(pe - 1) * normalize(n / pe, p) % pe) * (1LL * f(n % pe) * f(n / pe) % pe) % pe;
}
int ncr(long long n, long long r) {
	long long c;
	if ((c = legender(n, p) - legender(r, p) - legender(n - r, p)) >= e)return 0;
	for (int i = 1; i < pe; i++) F[i] = 1LL * F[i - 1] * normalize(i, p) % pe;
	return 1LL * (1LL * f(n) * Pow(p, c, pe) % pe) * Pow(1LL * f(r) * f(n - r) % pe, pe - pe / p - 1, pe) % pe;
}

int ncr(long long n, long long r, int m) {
	int a0 = 0, m0 = 1;
	for (p = 2; m != 1; p++) {
		e = 0, pe = 1; while (m % p == 0)m /= p, e++, pe *= p;
		if (e) {
			a0 = crt(a0, m0, ncr(n, r), pe);
			m0 = m0 * pe;
		}
	} return a0;
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t, m; cin >> t; while (t--) {
		long long n, k; cin >> n >> k >> m;
		long long a = (n + k - 1) / k;
		long long ex = a * k - n;
		cout << a << ' ' << ncr(ex + a - 1, a - 1, m) << '\n';
	}
}