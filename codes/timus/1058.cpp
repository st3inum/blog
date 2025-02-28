#include <bits/stdc++.h>
using namespace std;

const double eps = 1e-9;
int sign(double x) { return (x > eps) - (x < -eps); }
#define point pair<double,double>
#define x first
#define y second
point operator + (point a, point b) {return point(a.x + b.x, a.y + b.y);}
double operator | (point a, point b) {return a.x * b.x + a.y * b.y;}
point operator - (point a, point b) {return point(a.x - b.x, a.y - b.y);}
double operator * (point a, point b) {return a.x * b.y - a.y * b.x;}
point operator * (point a, double b) {return point(a.x * b , a.y * b);}
double dist2(point a) {return a | a;}
// double orientation(point a, point b, point c) {return sign((b - a) * (c - a));}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int n; cin >> n;
	vector<point> p(n);
	double perimeter = 0;
	for (auto &[x, y] : p)cin >> x >> y;
	for (int i = 0; i < n; i++) {
		p.push_back(p[i]);
		perimeter += sqrt(dist2(p[i] - p[i + 1]));
	}
	vector<double> dp(2 * n, 0);
	for (int i = 1; i < 2 * n; i++)dp[i] = dp[i - 1] + p[i - 1] * p[i];
	auto getarea = [&](int l, int r) {return abs(dp[r] - dp[l] + p[r] * p[l]);};
	auto getarea1 = [&](int l, int r, double rat2) {
		point M = (p[r + 1] - p[r]) * rat2 + p[r], N = p[l];
		return abs(dp[r] - dp[l] + p[r] * M + M * N + N * p[l]);
	};
	auto getarea2 = [&](int l, int r, double rat1, double rat2) {
		point M = (p[r + 1] - p[r]) * rat2 + p[r], N = (p[l + 1] - p[l]) * rat1 + p[l];
		return abs(dp[r] - dp[l + 1] + p[r] * M + M * N + N * p[l + 1]);
	};
	double area = getarea(0, n - 1);
	vector<tuple<int, double, int>> points;
	for (int st = 0, en = 0; st < n; st++) {
		while (getarea(st, en) * 2 <= area)en++;
		double l = 0, r = 1;
		int magic = 40;
		while (magic--) {
			double mid = (l + r) * .5;
			if (getarea1(st, en - 1, mid) * 2 >= area)r = mid;
			else l = mid;
		}
		points.push_back({st, 0, st});
		points.push_back({(en - 1) % n, l, st});
	}
	sort(points.begin(), points.end());
	vector<point> pts(n * 2);
	for (int i = 0; i < n; i++) {
		auto [st1, rat1, id1] = points[i];
		auto [st2, rat2, id2] = points[i + n];
		assert(id1 == id2);
		pts[i] = (p[st1 + 1] - p[st1]) * rat1 + p[st1];
		pts[i + n] = (p[st2 + 1] - p[st2]) * rat2 + p[st2];
	}
	pts.push_back(p[0]);
	auto line = [&](int i, double rat) {
		point N = (pts[i + 1] - pts[i]) * rat + pts[i];
		double l = 0, r = 1, ans = 0;
		int magic = 40;
		while (magic--) {
			double mid = (l + r) * .5;
			point M = (pts[i + n + 1] - pts[i + n]) * mid + pts[i + n];
			if (pts[i] * N + N * M + M * pts[i + n] + pts[i + n] * pts[i] <= 0) {
				ans = dist2(N - M);
				r = mid;
			} else {
				l = mid;
			}
		}
		return ans;
	};
	double ans = 1e18;
	for (int i = 0; i < n; i++) {
		double l = 0, r = 1;
		int magic = 40;
		while (magic--) {
			double mid1 = l + (r - l) / 3;
			double mid2 = r - (r - l) / 3;
			double X = line(i, mid1);
			double Y = line(i, mid2);
			ans = min({ans, X, Y});
			if (X < Y) {
				r = mid2;
			} else {
				l = mid1;
			}
		}
	}
	cout << setprecision(10) << fixed << sqrt(ans) << '\n';
}